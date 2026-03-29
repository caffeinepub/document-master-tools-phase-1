import { r as reactExports } from "./index-BK1nStnW.js";
function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = "/assets/generated/hero-banner.dim_1200x400.png",
  ogType = "website"
}) {
  reactExports.useEffect(() => {
    document.title = title;
    const setMetaTag = (property, content, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(
        `link[rel="${rel}"]`
      );
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.href = href;
    };
    setMetaTag("description", description);
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:url", canonicalUrl, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:image", `${window.location.origin}${ogImage}`, true);
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", `${window.location.origin}${ogImage}`);
    setLinkTag("canonical", canonicalUrl);
  }, [title, description, canonicalUrl, ogImage, ogType]);
  return null;
}
export {
  SEO as S
};
