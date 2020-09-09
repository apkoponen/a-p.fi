import React, { memo } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import {
  useStackedPagesProvider,
  StackedPagesProvider,
} from "react-stacked-pages-hook";
import { dataToNote, dataToSlug } from "../utils/data-to-note";
import Note from "./note";
import NoteWrapper from "./note-wrapper";
import Header from "./header";

import "./theme.css";
import "./stacked-layout.css";
import "./custom.css";

const Content = ({
  windowWidth,
  scrollContainer,
  stackedPages,
  index,
}: any) => {
  return (
    <div className="layout">
      <Header />
      <div className="note-columns-scrolling-container" ref={scrollContainer}>
        <div
          className="note-columns-container"
          style={{ width: 625 * (stackedPages.length + 1) }}
        >
          {stackedPages.map((page: any, i: any) => (
            <NoteWrapper
              key={page.slug}
              i={typeof index !== "undefined" ? index : i}
              slug={page.slug}
              title={page.data.title}
            >
              <Note {...page.data} />
            </NoteWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};
const MemoContent = memo(Content);

const NotesLayout = ({ location, slug, data }: any) => {
  const windowWidth = useWindowWidth();

  const [state, scrollContainer] = useStackedPagesProvider({
    firstPage: { slug: dataToSlug(data), data },
    location,
    processPageQuery: dataToNote,
    pageWidth: 625,
  });

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stackedPages' does not exist on type '(n... Remove this comment to see the full error message
  let pages = state.stackedPages;
  let activeIndex;
  if (windowWidth <= 800) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stackedPageStates' does not exist on typ... Remove this comment to see the full error message
    const activeSlug = Object.keys(state.stackedPageStates).find(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'stackedPageStates' does not exist on typ... Remove this comment to see the full error message
      (slug) => state.stackedPageStates[slug].active
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stackedPages' does not exist on type '(n... Remove this comment to see the full error message
    activeIndex = state.stackedPages.findIndex(
      (page: any) => page.slug === activeSlug
    );
    if (activeIndex === -1) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'stackedPages' does not exist on type '(n... Remove this comment to see the full error message
      activeIndex = state.stackedPages.length - 1;
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stackedPages' does not exist on type '(n... Remove this comment to see the full error message
    pages = [state.stackedPages[activeIndex]];
  }

  return (
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(node: HTMLDivElement) => void' is missing t... Remove this comment to see the full error message
    <StackedPagesProvider value={state}>
      <MemoContent
        windowWidth={windowWidth}
        scrollContainer={scrollContainer}
        stackedPages={pages}
        index={activeIndex}
      />
    </StackedPagesProvider>
  );
};

export default NotesLayout;
