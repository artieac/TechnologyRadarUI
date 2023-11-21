'use strict'
import jQuery from 'jquery';
import React, { useRouteMatch, useState} from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Route, DefaultRoute, Routes } from 'react-router-dom'
import HeaderComponent from 'Apps/Common/HeaderComponent'
import FooterComponent from 'Apps/Common/FooterComponent'
import HomePage from './Pages/HomePage'
import PublicRadarPage from './Pages/PublicRadarPage'
import SecureRadarPage from './Pages/SecureRadarPage'
import SearchPage from './Pages/SearchPage'
import DetailsPage from './Pages/DetailsPage'
import AboutPage from './Pages/AboutPage'
import ErrorBoundaryComponent from 'SharedComponents/ErrorBoundaryComponent'
import { appsProviderStore } from 'Apps/Common/ProviderStore'
import { StaticDataLoader } from 'Apps/Common/StaticDataLoader'
import NavBarRowDefinition from 'Apps/Common/HeaderComponent/NavBarRowDefinition'

export default function MainSiteApp() {
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const currentPage = useSelector((state) => state.navBarReducer.currentPage);

    const handleDoneLoading = () => {
        setIsLoading(false);
    }

    render
    return (
        <div>
            <HeaderComponent doneLoadingNotifier = { handleDoneLoading }/>
            {isLoading
                ? <div/>
                : <Routes>
                      <Route path="/" element={ <HomePage /> } />
                      <Route path="/public/home/user/:userId/radars" element={ <PublicRadarPage mostRecent={ true } /> } />
                      <Route path="/public/home/user/:userId/radars?mostrecent=true" element={ <PublicRadarPage mostRecent={ true } /> } />
                      <Route path="/public/home/user/:userId/radar/:radarId" element={ <PublicRadarPage mostRecent={ true }/> } />
                      <Route path="/public/home/user/:userId/radartemplate/:radarTemplateId/radars" element={ <PublicRadarPage /> } />
                      <Route path="/home/secureradar" element={ <SecureRadarPage /> } />
                      <Route path="/home/secureradar/:radarId" element={ <SecureRadarPage /> } />
                      <Route path="/search" element={ <SearchPage /> } />
                      <Route path="/public/radarsubject/:subjectId" element={ <DetailsPage /> } />
                      <Route path="/about" element={ <AboutPage /> } />
                  </Routes>
            }
            <FooterComponent />
        </div>
    );
}

ReactDOM.render(
    <Provider store={ appsProviderStore }>
        <BrowserRouter>
            <MainSiteApp/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("radarAppContent")
);