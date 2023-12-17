import { DefaultDocumentNodeResolver } from "sanity/desk";
import { Iframe } from "sanity-plugin-iframe-pane";
import { SanityDocument } from "sanity";

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument) {
  // @ts-ignore
  return doc?.slug?.current
    ? // @ts-ignore
      `http://localhost:3000/api/preview?slug=${doc?.slug?.current}`
    : `http://localhost:3000/api/preview`;

  // return doc?.slug?.current
  //   ? `${window.location.host}/api/preview/?slug=${doc.slug.current}`
  //   : `${window.location.host}/api/preview/`;
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            // url: `http://localhost:3000/api/preview`,
            url: (doc: SanityDocument) => getPreviewUrl(doc),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
