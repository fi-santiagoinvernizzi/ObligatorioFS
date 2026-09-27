import sanitizeHtml from "sanitize-html";

export const sanitizeMovieMiddleware = (req, res, next) => {
    if (typeof req.body.title === "string") {
        req.body.title = sanitizeHtml(req.body.title, {
            allowedTags: [],
            allowedAttributes: {}
        }).trim();
    }

    if (typeof req.body.description === "string") {
        req.body.description = sanitizeHtml(req.body.description, {
            allowedTags: [],
            allowedAttributes: {}
        }).trim();
    }

    next();
};