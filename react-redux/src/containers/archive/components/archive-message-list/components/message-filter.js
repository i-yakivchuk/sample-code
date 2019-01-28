/**
 * Created by ivan on 19.11.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { filterMessages } from '../../../../../actions/archive';
import { authors } from '../../../../../actions/authors';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from  'classnames';


class MessageFilter extends React.Component {

  constructor(props) {
    super(props);

    this.searchFilterOutside = this.searchFilterOutside.bind(this);
    this.openSearchInput = this.openSearchInput.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.selectAuthor = this.selectAuthor.bind(this);

    this.updateList = this.updateList.bind(this);
    this.state = {
      dropdownOpen2: false,
      isOpenSearchInput: false,
      filterName: '',
      authorId: 'default'
    };
  }

  componentDidMount() {
    let userId = this.props.user.CustomerId;
    this.props.authors({customerId: userId});

    document.addEventListener('mousedown', this.searchFilterOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.searchFilterOutside);
  }

  searchFilterOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.openSearchInput(false);
    }
  }

  toggle(number) {
    this.setState(JSON.parse('{"dropdownOpen' + number + '": ' + !this.state["dropdownOpen" + number] + '}'));
  }

  openSearchInput(status) {
    if(this.state.filterName && !status) return;
    this.setState({isOpenSearchInput: status});
  }

  clearSearchInput() {
    this.setState({filterName: ""});
    this.updateList({filterName: ""});
  }

  selectAuthor(e) {
    this.setState({ authorId: e.currentTarget.id });
    this.updateList({ authorId: e.currentTarget.id });
  }

  filterFunction(filterObj, slides) {
    let _slides = slides.map((item, i) => {
	    if (item.Name.toLowerCase().indexOf(filterObj.filterName.toLowerCase()) === -1 || (filterObj.authorId !== "default" && +filterObj.authorId !== item.CreatedByUserId)) {
		    item.hide = true;
	    } else {
		    item.hide = false;
	    }

	    return item;
    });

    return _slides;
  }

  updateList(updatedParams) {
    let { filterName, authorId } = this.state;
    this.props.filterMessages({ filter: this.filterFunction.bind(null, { filterName, authorId, ...updatedParams }) });
  }

  render() {
    const { messages, translate } = this.props;
    const cnt = messages.length;
    const { filterName, authorId } = this.state;
    const selectedAuthor = this.props.authorsList.filter(obj => obj.Id === +authorId)[0];
    const selectedAuthorName = selectedAuthor ? selectedAuthor.FirstName + " " + selectedAuthor.LastName : translate('LABEL_ALL_AUTHORS');

    return (
      <div className="content-template__filters list-filters">
        <div className="d-flex justify-content-between">
          <div>
            <div className="filters-search-block" ref={node => this.wrapperRef = node}>
              <span className="content-template__filters__icon" onClick={this.openSearchInput.bind(this, true)}><i className="menu-icon icon-search" /></span>

              <div className={classNames('search-filter', {'search-filter--close': !this.state.isOpenSearchInput})}>
                <input className="search-filter__search-input" onChange={text => {this.setState({filterName: text.target.value}); this.updateList({filterName: text.target.value});}} value={filterName}/>
                <span className={classNames('search-filter__close-icon', {'search-filter__close-icon--close': !filterName})} onClick={this.clearSearchInput}><i className="menu-icon icon-cross" /></span>
              </div>
            </div>

            <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle.bind(this, 2)}>
              <DropdownToggle
                tag="span"
                onClick={this.toggle.bind(this, 2)}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen2}>
			          { selectedAuthorName } <i className="fa fa-caret-down" />
              </DropdownToggle>
              <DropdownMenu>
                <Scrollbars ref="scrollbars"
                            autoHide
                            autoHideTimeout={500}
                            autoHideDuration={100}>
                  <DropdownItem id="default" key={-1} onClick={this.selectAuthor}>{translate('LABEL_ALL_AUTHORS')}</DropdownItem>
				          {
					          this.props.authorsList.map((item, i) =>
						          (<DropdownItem id={item.Id} key={i} onClick={this.selectAuthor}>{item.FirstName} {item.LastName}</DropdownItem>))
				          }
                </Scrollbars>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='total-count-block'>
            <span><span className='total-title'>{translate('LABEL_ARCHIVE_TOTAL')}:</span>&nbsp;&nbsp;<span className='total-sub-title'>{cnt}{' '}{translate('LABEL_ARCHIVE_SLIDES')}</span></span>
          </div>
        </div>
      </div>
    );
  }
}

const select = state => {
  return {
	  messages: state.archive.messages,
    authorsList: state.authors.filterList,
    user: state.user.current
  }
};

export default connect(select, { authors, filterMessages })(MessageFilter);
