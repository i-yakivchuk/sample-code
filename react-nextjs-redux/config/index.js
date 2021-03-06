import translations from './translations/en.json';
import styles from './style';
import environment from './environment';
import defaultFacilities from './facilities';
import demandScores from './demandScores';
import urgencyScores from './urgencyScores';

export default {
    translations,
    styles,
    environment,
    header: {
        shortNavigation: [{
            title: 'Search',
            url: '/properties',
        }],
        longNavigation: [{
            title: 'Search',
            url: '/properties',
        }, {
            title: 'Blogs',
            url: '/blog',
        }],
        mobileNavigation: [{
            title: 'Blogs',
            url: '/blog',
        }, {
            title: 'Contact',
            url: '/contact',
        }],
    },
    footer: {
        navigation: {
            company: [{
                title: 'Blog',
                url: '/blog',
            }, {
                title: 'Contact',
                url: '/contact',
            }],
            properties: [{
                title: 'Search',
                url: '/properties',
            }, {
                title: 'Join us',
                url: '/joinUs',
                as: '/join-us',
            }],
            bottom: [{
                title: 'Terms',
                url: '/terms',
            }, {
                title: 'Privacy',
                url: '/privacy',
            }],
        },
    },
    helpCenter: {
        navigation: [{
            title: 'Terms & Conditions',
            url: '/terms',
        }, {
            title: 'Providers\' Terms',
            url: '/providersTerms',
            as: '/providers-terms'
        }, {
            title: 'Privacy & Cookies',
            url: '/privacy',
        }],
    },
    user: {
        navigation: [{
            title: 'Profile',
            url: '/user',
            as: '/user',
        }, {
            title: 'Photos',
            url: '/user',
            as: '/user/photos',
        }, {
            title: 'Reset Password',
            url: '/resetPassword',
            as: '/reset-password',
        }],
    },
    agent: {
        navigation: [{
            title: 'Manual Property Upload',
            url: '/dashboard',
            as: '/dashboard/properties/add',
        }, {
            title: 'Dashboard',
            url: '/dashboard',
        }, {
            title: 'Properties',
            url: '/dashboard',
            as: '/dashboard/properties',
        }, {
            title: 'Enquiries',
            url: '/dashboard',
            as: '/dashboard/enquiries',
        }, {
            title: 'Profile',
            url: '/dashboard',
            as: '/dashboard/profile',
        }, {
            title: 'Support',
            url: '/dashboard',
            as: '/dashboard/support',
        }],
    },
    admin: {
        navigation: [{
            title: 'Properties',
            url: '/admin',
            as: '/admin/properties',
        }, {
            title: 'Users',
            url: '/admin',
            as: '/admin/users',
        }, {
            title: 'Agents',
            url: '/admin',
            as: '/admin/agents',
        }],
        singleAgent: {
            navigation: [{
				       title: 'Manual Property Upload',
		            url: (id) => `/adminAgent?id=${id}&section=properties`,
		            as: (id) => `/admin-agent-dashboard/${id}/properties/add`,
		        }, {
                title: 'Dashboard',
                url: (id) => `/adminAgent?id=${id}`,
		            as: (id) => `/admin-agent-dashboard/${id}`,
            }, {
                title: 'Properties',
                url: (id) => `/adminAgent?section=properties&id=${id}`,
                as: (id) => `/admin-agent-dashboard/${id}/properties`,
            }, {
		            title: 'Enquiries',
		            url: (id) => `/adminAgent?section=enquiries&id=${id}`,
		            as: (id) => `/admin-agent-dashboard/${id}/enquiries`,
            }, {
		            title: 'Profile',
		            url: (id) => `/adminAgent?section=profile&id=${id}`,
		            as: (id) => `/admin-agent-dashboard/${id}/profile`,
            }]
        }
    },
    universities: [
        'Aberystwyth University',
        'Anglia Ruskin University',
        'Arts University Bournemouth',
        'Aston University',
        'Bangor University',
        'Bath Spa University',
        'Birkbeck, University of London',
        'Birmingham City University',
        'Bishop Grosseteste University College Lincoln',
        'Bournemouth University',
        'Brunel University',
        'Bucks New University',
        'Canterbury Christ Church University',
        'Cardiff Metropolitan University',
        'Cardiff University',
        'Central School of Speech & Drama',
        'City University London',
        'Coventry University',
        'Cranfield University',
        'De Montfort University',
        'Durham University',
        'Edge Hill University',
        'Edinburgh Napier University',
        'European School of Economics',
        'Falmouth University',
        'Glasgow Caledonian University',
        'Glasgow School of Art',
        'Glyndwr University',
        'Goldsmiths, University of London',
        'Harper Adams University College',
        'Heriot-Watt University',
        'Heythrop College, University of London',
        'Imperial College London',
        'Keele University',
        'King\'s College London',
        'Kingston University',
        'Lancaster University',
        'Leeds Beckett University',
        'Liverpool Hope University',
        'Liverpool John Moores University',
        'London Business School',
        'London Metropolitan University',
        'London School of Hygiene and Tropical Medicine, University of London',
        'London South Bank University',
        'Loughborough University',
        'Manchester Metropolitan University',
        'Middlesex University',
        'Newcastle University',
        'Northumbria University',
        'Nottingham Trent University',
        'Oxford Brookes University',
        'Plymouth University',
        'Queen Margaret University',
        'Queen Mary, University of London',
        'Queen\'s University Belfast',
        'Richmond, The American International University in London',
        'Roehampton University',
        'Royal Academy of Music, University of London',
        'Royal Agricultural University',
        'Royal College of Art',
        'Royal College of Music',
        'Royal Conservatoire of Scotland',
        'Royal Holloway, University of London',
        'Royal Veterinary College University of London',
        'School of Advanced Study, University of London',
        'School of Oriental and African Studies, University of London',
        'Scotland’s Rural College',
        'Sheffield Hallam University',
        'Southampton Solent University',
        'St George\'s, University of London',
        'Staffordshire University',
        'Swansea University',
        'Teesside University',
        'The Courtauld Institute of Art, University of London',
        'The London School of Economics and Political Science',
        'The Robert Gordon University',
        'The University of Buckingham',
        'The University of Edinburgh',
        'The University of Hull',
        'The University of Manchester',
        'The University of Northampton',
        'The University of Nottingham',
        'The University of Sheffield',
        'The University of Warwick',
        'The University of Winchester',
        'The University of York',
        'University College Birmingham',
        'University College London',
        'University for the Creative Arts',
        'University of Aberdeen',
        'University of Abertay Dundee',
        'University of Bath',
        'University of Bedfordshire',
        'University of Birmingham',
        'University of Bolton',
        'University of Bradford',
        'University of Brighton',
        'University of Bristol',
        'University of Cambridge',
        'University of Central Lancashire',
        'University of Chester',
        'University of Cumbria',
        'University of Derby',
        'University of Dundee',
        'University of East Anglia',
        'University of East London',
        'University of Essex',
        'University of Exeter',
        'University of Glasgow',
        'University of Gloucestershire',
        'University of Greenwich',
        'University of Hertfordshire',
        'University of Huddersfield',
        'University of Kent',
        'University of Leeds',
        'University of Leicester',
        'University of Lincoln',
        'University of Liverpool',
        'University of London',
        'University of Oxford',
        'University of Portsmouth',
        'University of Reading',
        'University of Salford',
        'University of South Wales',
        'University of Southampton',
        'University of St Andrews',
        'University of Stirling',
        'University of Strathclyde',
        'University of Sunderland',
        'University of Surrey',
        'University of Sussex',
        'University of the Arts London',
        'University of the West of England',
        'University of the West of Scotland',
        'University of Ulster',
        'University of Wales',
        'University of Wales Trinity Saint David',
        'University of West London',
        'University of Westminster',
        'University of Wolverhampton',
        'University of Worcester',
        'York St John University',
    ],
    socialNetworks: {
        facebook: 'https://www.facebook.com/resooma',
        twitter: 'https://twitter.com/resoomaHQ',
        instagram: 'https://www.instagram.com/resooma/',
        youtube: 'https://www.youtube.com/channel/UCgcc0vdO_hfI7LHiUbQJQKw',
        linkedin: 'https://www.linkedin.com/company/resooma/',
    },
    fallbackTelephone: '020 8191 7855',
    fallbackEmail: 'info@resooma.com',
    defaultFacilities,
    demandScores,
    urgencyScores,
};
