const lastViewedVideo = {}; // { userId: { videoId: timestamp } }

const videoViewsMiddleware = (req, res, next) => {
    const { videoId, videoTitle, userId, fullname, username } = req.body;

    const isFieldsEmpty = [videoId, videoTitle, userId, fullname, username].some(
        (field) => typeof field !== 'string' || field.trim() === ""
    );

    if (isFieldsEmpty) {
        return res.status(400).json({ message: "Some of the fields are missing." });
    }

    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;

    // Initialize user in tracking map if not present
    if (!lastViewedVideo[userId]) {
        lastViewedVideo[userId] = {};
    }

    const userVideos = lastViewedVideo[userId];

    // If the same user has watched the same video
    if (userVideos[videoId]) {
        const lastViewedTime = userVideos[videoId];
        if (now - lastViewedTime < TEN_MINUTES) {
            // Within 10 minutes, block the request
            return res.status(204).end(); // No Content
        }
    }

    // Otherwise, update the timestamp and allow controller to run
    userVideos[videoId] = now;
    next();
};

export default videoViewsMiddleware;
