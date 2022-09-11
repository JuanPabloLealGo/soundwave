# New Spotify Frontend

## Components Herarchical Design

In the following hierarchy HomeScreen.tsx as a child of MainLayout.tsx renders HomeComponent.
The MainLayout is rendered by App and finally index.tsx renders App.tsx and set the find view
in the root element of index.html. 

                                    index.html
                                        |
                                        | <renders>
                                        |
                                    index.tsx
                                        |
                                        | <renders>
                                        |
                                     App.tsx
                                        |
                                        | <renders>
                                        |
                                  MainLayout.tsx
                                        |
                                        |
                                        |
                  <MainLayout renders different screen components 
                        as "children" according to rute app>
                                        |
                                        |
           - - - - - - - - - - - - - - -|- - - - - - - - - - - - - - 
          |                             |                           |
          |                             |                           |
  HeaderComponent.tsx               {children}               FooterComponent.tsx
                              [exm: HomeScreen.tsx]
                                        |
                                        |
                                {page components}
                              [exm: HomeComponent.tsx]

## Folder structure

 src
  |
  |- - api (axios setup and intercepting related)
  |
  |- - components (all tsx files i.e. components - layouts, screens, pages, header, footer)
  |
  |- - environment (production or staging related configuration)
  |
  |- - interface (data - type deefinition of state / different)
  |
  |- - redux-store (redux setup - epic, reducers, store)
  |
  |- - service (api call to backend services)
  |
  |- - utils (helper - fiunctions, constants are here)
  |
  |- - styles (component styles)