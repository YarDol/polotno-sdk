import { FC } from "react";
import { InputGroup } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { SectionTab } from "polotno/side-panel";
import { useInfiniteAPI } from "polotno/utils/use-api";
import { Video } from "@blueprintjs/icons";
import { selectVideo } from "polotno/side-panel/select-video";
import { StoreType } from "polotno/model/store";
import { getCustomAPI } from "../../api/usecases/custom-api";
import { VideosResponse } from "../../api/responses/videos/videos.response";
import { IVideo } from "../../api/interfaces/video.interface";
import { SectionTabProps } from "../../api/interfaces/section-tab.interface";

export const VideosPanel: FC<{ store: StoreType }> = ({ store }) => {
  const content = "videos";
  const userId = 1;
  const {
    loadMore,
    isReachingEnd,
    data,
    isLoading,
    error,
    setQuery: setAPIQuery,
  } = useInfiniteAPI({
    defaultQuery: "",
    getAPI: ({ page, query }) => getCustomAPI({ content, page, userId, query }),
    getSize: (lastResponse: VideosResponse) =>
      Math.ceil(lastResponse.total / lastResponse.per_page),
  });

  return (
    <div className="component">
      <InputGroup
        leftIcon="search"
        placeholder={"Search..."}
        onChange={(e) => {
          setAPIQuery(e.target.value);
        }}
        type="search"
        className="search-bar"
      />
      <ImagesGrid
        images={data
          ?.map((item) => item.data)
          .flat()
          .filter(Boolean)}
        getPreview={(video: IVideo) => `${video.thumbnail_url}`}
        onSelect={async (video: IVideo, pos, element) => {
          const src = `${video.url}`;

          selectVideo({
            src,
            store,
            droppedPos: pos,
            targetElement: element,
          });
        }}
        isLoading={isLoading}
        error={error}
        loadMore={!isReachingEnd && loadMore}
        getCredit={(video: IVideo) => (
          <span>
            Video:{" "}
            <a href={video.url} target="_blank" rel="noreferrer">
              {video.title}
            </a>
          </span>
        )}
      />
    </div>
  );
};

export const VideosSection = {
  name: "videos",
  Tab: Object.assign(
    (props: SectionTabProps) => (
      <SectionTab name="Videos" {...props}>
        <Video size={26} color="#009ef7" />
      </SectionTab>
    ),
    { displayName: "VideosTab" }
  ),
  Panel: (props: { store: StoreType }) => <VideosPanel store={props.store} />,
};
