'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">city-bus documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' : 'data-target="#xs-components-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' :
                                            'id="xs-components-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' : 'data-target="#xs-injectables-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' :
                                        'id="xs-injectables-links-module-AppModule-6fbdc6703eb76019c3405aa57e86902efc1aaf317eb052bff4b33046fe64735630a086d62ac211f3dc99cf555602f39d30a511d1a07726561180e8052011f259"' }>
                                        <li class="link">
                                            <a href="injectables/SocketIOService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocketIOService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' : 'data-target="#xs-components-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' :
                                            'id="xs-components-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' : 'data-target="#xs-injectables-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' :
                                        'id="xs-injectables-links-module-AuthModule-1e82311669d302ef3d49d473bd9e2f4602afd98e124aec7b492626609d825c6288bbfe04a1763b2c34923c4b64b757c535d24f10085dccee22b17b5c71062e64"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LinesModule.html" data-type="entity-link" >LinesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LinesModule-6ce1c36b72d87d8743e8139f2d2d7ae9909d28f277475ff1da2245b4db6856bf08814db8566d0ba8da25e05e36e680405a0d42d30c4fa7c68f121a5a8f94a1da"' : 'data-target="#xs-components-links-module-LinesModule-6ce1c36b72d87d8743e8139f2d2d7ae9909d28f277475ff1da2245b4db6856bf08814db8566d0ba8da25e05e36e680405a0d42d30c4fa7c68f121a5a8f94a1da"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LinesModule-6ce1c36b72d87d8743e8139f2d2d7ae9909d28f277475ff1da2245b4db6856bf08814db8566d0ba8da25e05e36e680405a0d42d30c4fa7c68f121a5a8f94a1da"' :
                                            'id="xs-components-links-module-LinesModule-6ce1c36b72d87d8743e8139f2d2d7ae9909d28f277475ff1da2245b4db6856bf08814db8566d0ba8da25e05e36e680405a0d42d30c4fa7c68f121a5a8f94a1da"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LinesDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinesDropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LinesMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinesMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RouteDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouteDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RouteListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouteListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StationListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StationListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LinesRoutingModule.html" data-type="entity-link" >LinesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MapModule.html" data-type="entity-link" >MapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MapModule-ea95154233c490c8e6768750b086ec43c521780f03be46e0f8315c18bfa1b6ca963047dd3992462acae7d32a705f58c9a520acddc861193b7296b8f299a45791"' : 'data-target="#xs-components-links-module-MapModule-ea95154233c490c8e6768750b086ec43c521780f03be46e0f8315c18bfa1b6ca963047dd3992462acae7d32a705f58c9a520acddc861193b7296b8f299a45791"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MapModule-ea95154233c490c8e6768750b086ec43c521780f03be46e0f8315c18bfa1b6ca963047dd3992462acae7d32a705f58c9a520acddc861193b7296b8f299a45791"' :
                                            'id="xs-components-links-module-MapModule-ea95154233c490c8e6768750b086ec43c521780f03be46e0f8315c18bfa1b6ca963047dd3992462acae7d32a705f58c9a520acddc861193b7296b8f299a45791"' }>
                                            <li class="link">
                                                <a href="components/MapAreaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapAreaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlannerModule.html" data-type="entity-link" >PlannerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' : 'data-target="#xs-components-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' :
                                            'id="xs-components-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' }>
                                            <li class="link">
                                                <a href="components/BookOptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BookingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlacesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacesMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlacesMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacesSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlacesSliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QrComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QrComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopDropDownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopDropDownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TripPlannerOptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TripPlannerOptionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' : 'data-target="#xs-injectables-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' :
                                        'id="xs-injectables-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' }>
                                        <li class="link">
                                            <a href="injectables/DirectionsStore.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DirectionsStore</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' : 'data-target="#xs-pipes-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' :
                                            'id="xs-pipes-links-module-PlannerModule-1f11cf9883fcbdf5b96eb56545ed8f60f7e330fd24a91fd2c4447c3c30b62a77219cc131c7162b39aceead77fc13a7513731a3b1d534f9324234a600e78044b1"' }>
                                            <li class="link">
                                                <a href="pipes/BookingPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoutesRoutingModule.html" data-type="entity-link" >RoutesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SavedModule.html" data-type="entity-link" >SavedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' : 'data-target="#xs-components-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' :
                                            'id="xs-components-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' }>
                                            <li class="link">
                                                <a href="components/SavedSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SavedSliderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' : 'data-target="#xs-injectables-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' :
                                        'id="xs-injectables-links-module-SavedModule-56ab63128746cbab17ddee0c6d00d528b24020b2a44139f26780750c611efd32dd802e8ee1936b0bfaa054b4b6d237a78eee0b531acc2d4b747a5a19dac459f7"' }>
                                        <li class="link">
                                            <a href="injectables/DataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SavedRoutingModule.html" data-type="entity-link" >SavedRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' : 'data-target="#xs-components-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' :
                                            'id="xs-components-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' }>
                                            <li class="link">
                                                <a href="components/BusEntityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BusEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DoubleInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DoubleInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownOptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownOptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MiniMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MiniMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultipleDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultipleDropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StationEntityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StationEntityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToasterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToasterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' : 'data-target="#xs-pipes-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' :
                                            'id="xs-pipes-links-module-SharedModule-3c7c037f3b0d7a4a23e8e71ab1222a7f6191c17097615ee3463d620a667c61d284f305fa26137a7015512805d958c770d44373f27aa698f2adef1ef68954eac4"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidebarModule.html" data-type="entity-link" >SidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' : 'data-target="#xs-components-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' :
                                            'id="xs-components-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' }>
                                            <li class="link">
                                                <a href="components/SideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarOptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarOptionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' : 'data-target="#xs-injectables-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' :
                                        'id="xs-injectables-links-module-SidebarModule-a4942a2a6493714d78ff92eea6db8dcf976f0008fb18398089f14cbb868b1b70769f1e3ad0f95117653ec4b763779d24b6880f1183d617268d1e75394ffede13"' }>
                                        <li class="link">
                                            <a href="injectables/DataShareService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataShareService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SidebarRoutingModule.html" data-type="entity-link" >SidebarRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StopsModule.html" data-type="entity-link" >StopsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StopsModule-71f20036e945d5d27d204d5170147cc8d2f8ee55c81fd28036c4630251a53f1700e5c17251cda57e16e37fd716ca6026534be6a025a1029da706e7a7bd085ea6"' : 'data-target="#xs-components-links-module-StopsModule-71f20036e945d5d27d204d5170147cc8d2f8ee55c81fd28036c4630251a53f1700e5c17251cda57e16e37fd716ca6026534be6a025a1029da706e7a7bd085ea6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StopsModule-71f20036e945d5d27d204d5170147cc8d2f8ee55c81fd28036c4630251a53f1700e5c17251cda57e16e37fd716ca6026534be6a025a1029da706e7a7bd085ea6"' :
                                            'id="xs-components-links-module-StopsModule-71f20036e945d5d27d204d5170147cc8d2f8ee55c81fd28036c4630251a53f1700e5c17251cda57e16e37fd716ca6026534be6a025a1029da706e7a7bd085ea6"' }>
                                            <li class="link">
                                                <a href="components/StopSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopSliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopsMapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopsMapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StopsRoutingModule.html" data-type="entity-link" >StopsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomSerializer.html" data-type="entity-link" >CustomSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinesMap.html" data-type="entity-link" >LinesMap</a>
                            </li>
                            <li class="link">
                                <a href="classes/Map.html" data-type="entity-link" >Map</a>
                            </li>
                            <li class="link">
                                <a href="classes/StopsMap.html" data-type="entity-link" >StopsMap</a>
                            </li>
                            <li class="link">
                                <a href="classes/TripPlannerMap.html" data-type="entity-link" >TripPlannerMap</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiEffects.html" data-type="entity-link" >ApiEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiEffects-1.html" data-type="entity-link" >ApiEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookingsStore.html" data-type="entity-link" >BookingsStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataShareService.html" data-type="entity-link" >DataShareService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DirectionsStore.html" data-type="entity-link" >DirectionsStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LiveDataStore.html" data-type="entity-link" >LiveDataStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterEffects.html" data-type="entity-link" >RouterEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterEffects-1.html" data-type="entity-link" >RouterEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocketIOService.html" data-type="entity-link" >SocketIOService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StopsStore.html" data-type="entity-link" >StopsStore</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/MiniMapService.html" data-type="entity-link" >MiniMapService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState-1.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookInfo.html" data-type="entity-link" >BookInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Booking.html" data-type="entity-link" >Booking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Booking-1.html" data-type="entity-link" >Booking</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookingState.html" data-type="entity-link" >BookingState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookingState-1.html" data-type="entity-link" >BookingState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BookingState-2.html" data-type="entity-link" >BookingState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrentRoute.html" data-type="entity-link" >CurrentRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IArrival.html" data-type="entity-link" >IArrival</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IArrival-1.html" data-type="entity-link" >IArrival</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILine.html" data-type="entity-link" >ILine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILine-1.html" data-type="entity-link" >ILine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMapData.html" data-type="entity-link" >IMapData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMapData-1.html" data-type="entity-link" >IMapData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INotification.html" data-type="entity-link" >INotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INotification-1.html" data-type="entity-link" >INotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPoint.html" data-type="entity-link" >IPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPoint-1.html" data-type="entity-link" >IPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRoute.html" data-type="entity-link" >IRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRoute-1.html" data-type="entity-link" >IRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouteInfo.html" data-type="entity-link" >IRouteInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRouteInfo-1.html" data-type="entity-link" >IRouteInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISchedule.html" data-type="entity-link" >ISchedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISchedule-1.html" data-type="entity-link" >ISchedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScheduleDetails.html" data-type="entity-link" >IScheduleDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScheduleDetails-1.html" data-type="entity-link" >IScheduleDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStop.html" data-type="entity-link" >IStop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStop-1.html" data-type="entity-link" >IStop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Itinerary.html" data-type="entity-link" >Itinerary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Itinerary-1.html" data-type="entity-link" >Itinerary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Leg.html" data-type="entity-link" >Leg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Leg-1.html" data-type="entity-link" >Leg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LineState.html" data-type="entity-link" >LineState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LineState-1.html" data-type="entity-link" >LineState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LiveState.html" data-type="entity-link" >LiveState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LiveState-1.html" data-type="entity-link" >LiveState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/msg.html" data-type="entity-link" >msg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Plan.html" data-type="entity-link" >Plan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Plan-1.html" data-type="entity-link" >Plan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QRLocal.html" data-type="entity-link" >QRLocal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterStateUrl.html" data-type="entity-link" >RouterStateUrl</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouteState.html" data-type="entity-link" >RouteState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouteState-1.html" data-type="entity-link" >RouteState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Saved.html" data-type="entity-link" >Saved</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScheduleState.html" data-type="entity-link" >ScheduleState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScheduleState-1.html" data-type="entity-link" >ScheduleState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Step.html" data-type="entity-link" >Step</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Step-1.html" data-type="entity-link" >Step</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StopInfo.html" data-type="entity-link" >StopInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StopState.html" data-type="entity-link" >StopState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StopState-1.html" data-type="entity-link" >StopState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TripData.html" data-type="entity-link" >TripData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TripData-1.html" data-type="entity-link" >TripData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TripState.html" data-type="entity-link" >TripState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vertex.html" data-type="entity-link" >Vertex</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vertex-1.html" data-type="entity-link" >Vertex</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});