import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { filterMobileMessages } from '../../../../../actions/mobile';
import { authors } from '../../../../../actions/authors';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from  'classnames';
import * as R from 'ramda';


class MobileMessageFilters extends React.Component {

  constructor(props) {
    super(props);

	  this.state = {
		  authorDropDownIsOpen: false,
		  isOpenSearchInput: false,
		  filters: { active: true, planned: true, concept: true },
		  filterName: '',
		  authorId: 'default'
	  };

    this.toggle = this.toggle.bind(this);
    this.updateList = this.updateList.bind(this);
    this.selectAuthor = this.selectAuthor.bind(this);
    this.openSearchInput = this.openSearchInput.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.searchFilterOutside = this.searchFilterOutside.bind(this);
  }

  componentDidMount() {
    let userId = this.props.user.CustomerId;
    this.props.authors({customerId: userId});

    document.addEventListener('mousedown', this.searchFilterOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.searchFilterOutside);
  }

	componentWillReceiveProps(nextProps) {
		if (this.props.messages && nextProps.messages && !R.equals(this.props.messages, nextProps.messages))
			this.updateList({});
	}

  searchFilterOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target))
      this.openSearchInput(false);
  }

  toggle() {
    this.setState({ authorDropDownIsOpen: !this.state.authorDropDownIsOpen });
  }

  openSearchInput(status) {
    if (this.state.filterName && !status) return;
    this.setState({isOpenSearchInput: status});
  }

  clearSearchInput() {
    this.setState({filterName: ''});
    this.updateList({filterName: ''});
  }

  statusFilter(status) {
    let newStatus = {};
    newStatus[status] = !this.state.filters[status];

    this.setState({ filters: {...this.state.filters, ...newStatus }});
    this.updateList({ filters: {...this.state.filters, ...newStatus} });
  }

  selectAuthor(e) {
    this.setState({authorId: e.currentTarget.id});
    this.updateList({authorId: e.currentTarget.id});
  }

  filterFunction(filterObj, slides) {
    let _slides = slides.map((item, i) => {
      if (!filterObj.filters[item.Status] || item.Name.toLowerCase().indexOf(filterObj.filterName.toLowerCase()) === -1
        || (filterObj.authorId !== 'default' && +filterObj.authorId !== item.CreatedByUserId)) {
        item.hide = true;
      } else {
        item.hide = false;
      }

      return item;
    });

    return _slides;
  }

  updateList(updatedParams) {
    let { filters, filterName, authorId } = this.state;
    this.props.filterMobileMessages({ filter: this.filterFunction.bind(null, { filters, filterName, authorId, ...updatedParams }) });
  }

  render() {
    const { translate, counts } = this.props;
    const { active, planned, concept } = this.state.filters;
    const { filterName, authorId, authorDropDownIsOpen } = this.state;

    let selectedAuthor = this.props.authorsList.filter(obj => obj.Id === +authorId)[0];
    let selectedAuthorName = selectedAuthor ? selectedAuthor.FirstName + " " + selectedAuthor.LastName : translate('LABEL_ALL_AUTHORS');

    return (
      <div className="content-template__filters">
        <div className="filters-search-block" ref={node => this.wrapperRef = node}>
          <span className="content-template__filters__icon" onClick={this.openSearchInput.bind(this, true)}><i className="menu-icon icon-search"/></span>

          <div className={classNames('search-filter', {'search-filter--close': !this.state.isOpenSearchInput})}>
            <input className="search-filter__search-input" onChange={text => {
              this.setState({filterName: text.target.value});
              this.updateList({filterName: text.target.value});
            }} value={filterName}/>
            <span className={classNames('search-filter__close-icon', {'search-filter__close-icon--close': !filterName})}
                  onClick={this.clearSearchInput}><i className="menu-icon icon-cross"/>
            </span>
          </div>
        </div>

        <Dropdown isOpen={authorDropDownIsOpen} toggle={this.toggle}>
          <DropdownToggle tag='span' onClick={this.toggle} data-toggle='dropdown' aria-expanded={authorDropDownIsOpen}>
            { selectedAuthorName } <i className="fa fa-caret-down" />
          </DropdownToggle>
          <DropdownMenu>
            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
              <DropdownItem id="default" key={-1} onClick={this.selectAuthor}>{translate('LABEL_ALL_AUTHORS')}</DropdownItem>
              { this.props.authorsList.map((item, i) =>
                (<DropdownItem id={item.Id} key={i} onClick={this.selectAuthor}>{item.FirstName} {item.LastName}</DropdownItem>))
              }
            </Scrollbars>
          </DropdownMenu>
        </Dropdown>

        <span className="content-template__list content-template__list--statuses">
          <span className={classNames('status', 'status--active', {'selected': active})}
                onClick={this.statusFilter.bind(this, "active")}>{counts.active}{' '}{translate('STATUS_ACTIVE')}
          </span>
          <span className={classNames('status', 'status--planned', {'selected': planned})}
                onClick={this.statusFilter.bind(this, "planned")}>{counts.planned}{' '}{translate('STATUS_PLANNED')}
          </span>
          <span className={classNames('status', 'status--concept', {'selected': concept})}
                onClick={this.statusFilter.bind(this, "concept")}>{counts.concept}{' '}{translate('STATUS_CONCEPT')}
          </span>
        </span>
      </div>
    );
  }
}

const select = state => {
  return {
    messages: state.mobile.messages,
    counts: state.mobile.counts,
    authorsList: state.authors.filterList,
    user: state.user.current
  }
};

export default connect(select, { authors, filterMobileMessages })(MobileMessageFilters);
