import "./App.scss";
import { SidePanel, TextSection } from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { Workspace } from "polotno/canvas/workspace";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { createStore } from "polotno/model/store";
import "@blueprintjs/core/lib/css/blueprint.css";
import { VideosSection } from "./components/Sections/VideoSection/VideoSection";
import { ImagesSection } from "./components/Sections/ImageSection/ImageSection";

const sections = [TextSection, VideosSection, ImagesSection];

function App() {
  const store = createStore();
  return (
    <div className="container">
      <PolotnoContainer>
        <SidePanelWrap>
          <SidePanel store={store} sections={sections} defaultSection="text" />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar store={store} />
          <Workspace
            store={store}
            paddingX={50}
            paddingY={50}
            components={{ PageControls: () => null }}
          />
          <ZoomButtons store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
}

export default App;
