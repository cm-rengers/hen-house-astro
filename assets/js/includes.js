// Runtime partial loader for header and footer

(function () {
  function loadPartials() {
    var containers = document.querySelectorAll("[data-include]");
    if (!containers.length) return;

    var remaining = containers.length;

    containers.forEach(function (container) {
      var url = container.getAttribute("data-include");
      if (!url) {
        if (--remaining === 0) {
          document.dispatchEvent(new CustomEvent("partialsLoaded"));
        }
        return;
      }

      // Ensure we use a relative path for Netlify / static hosting
      var relativeUrl = url.replace(/^\//, "");

      fetch(relativeUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Failed to load partial: " + relativeUrl);
          }
          return response.text();
        })
        .then(function (html) {
          container.innerHTML = html;
        })
        .catch(function (error) {
          // Fallback to empty content on error
          console.error(error);
          container.innerHTML = "";
        })
        .finally(function () {
          if (--remaining === 0) {
            document.dispatchEvent(new CustomEvent("partialsLoaded"));
          }
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPartials);
  } else {
    loadPartials();
  }
})();

