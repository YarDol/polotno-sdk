import { FC } from "react";
import { InputGroup } from "@blueprintjs/core";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { SectionTab } from "polotno/side-panel";
import { useInfiniteAPI } from "polotno/utils/use-api";
import { Media as ImageIcon } from "@blueprintjs/icons";
import { selectImage } from "polotno/side-panel/select-image";
import { StoreType } from "polotno/model/store";
import { getCustomAPI } from "../../api/usecases/custom-api";
import { ImagesResponse } from "../../api/responses/images/images.response";
import { IImage } from "../../api/interfaces/image.interface";
import { SectionTabProps } from "../../api/interfaces/section-tab.interface";

export const ImagesPanel: FC<{ store: StoreType }> = ({ store }) => {
  const content = "images";
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
    getSize: (lastResponse: ImagesResponse) =>
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
        getPreview={(image: IImage) => `${image.url}`}
        onSelect={async (image: IImage, pos, element) => {
          const src = `${image.url}`;

          selectImage({
            src,
            store,
            droppedPos: pos,
            targetElement: element,
          });
        }}
        isLoading={isLoading}
        error={error}
        loadMore={!isReachingEnd && loadMore}
        getCredit={(image: IImage) => (
          <span>
            Image:{" "}
            <a href={image.url} target="_blank" rel="noreferrer">
              {image.title}
            </a>
          </span>
        )}
      />
    </div>
  );
};

export const ImagesSection = {
  name: "images",
  Tab: Object.assign(
    (props: SectionTabProps) => (
      <SectionTab name="Images" {...props}>
        <ImageIcon size={26} color="#009ef7" />
      </SectionTab>
    ),
    { displayName: "ImagesTab" }
  ),
  Panel: (props: { store: StoreType }) => <ImagesPanel store={props.store} />,
};
