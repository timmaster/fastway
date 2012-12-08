app.FacebookMapper = (function () {
    var provider = app.Models.Providers.Facebook;

    var getAuthInfo = function (input) {
        var result = new app.Models.AuthInfo(input.accessToken);
        return result;
    };

    var getUser = function (input) {
        var obj = {
            provider: provider,
            id: input.id,
            name: input.name
        };

        var result = new app.Models.User(obj);
        return result;
    };

    var getPost = function (input) {
        var obj = {
            provider: provider,
            id: input.id,
            created: input.created_time,
            message: input.message,
            thumbnail: input.picture,
            user: {
                type: "User",
                provider: provider,
                id: input.from.id,
                name: input.from.name
            },
            otherInfo: {
                type: input.type,
                status_type: input.status_type,
                object_id: input.object_id,
                link: input.link
            },

            fb_type: input.type
        };

        var result = new app.Models.Post(obj);
        return result;
    };

    var getAlbum = function (input) {
        var obj = {
            provider: provider,
            id: input.id,
            name: input.name,
            thumbnail: null,
            coverPhotoId: input.cover_photo
        };

        var result = new app.Models.Album(obj);
        return result;
    };

    var getPhoto = function (input) {
        var obj = {
            provider: provider,
            id: input.id,
            thumbnail: input.picture,
            source: input.source,
            width: input.width,
            height: input.height,
            caption: input.name,
            user: {
                type: "User",
                provider: provider,
                id: input.from.id,
                name: input.from.name
            }
        };

        var result = new app.Models.Photo(obj);
        return result;
    };

    return {
        getAuthInfo: getAuthInfo,
        getUser: getUser,
        getPost: getPost,
        getAlbum: getAlbum,
        getPhoto: getPhoto
    };
})();