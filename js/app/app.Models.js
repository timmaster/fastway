app.Models = {
    getObjectArray: function (modelArray) {
        if (!!modelArray)
            return null;

        var result = [];

        _.each(modelArray, function (o) {
            result.push((!!o.toObject ? o.toObject() : o));
        });

        return result;
    },

    getModel: function (obj) {
        var result = null;

        if (!!obj & !!obj.type) {
            //result = app.Models[obj.type].apply(this, obj); // TODO: What is "this"?
            result = new app.Models[obj.type](obj);
        }

        return result;
    },

    getModelList: function (objectArray) {
        if (!objectArray.length)
            return null;

        var result = [];

        _.each(objectArray, function (o) {
            var model;

            try {
                model = getModel(o);
            } catch (err) { // TODO: Do we really want to catch and add non-model or poorly-defined model?
                model = o;
            }

            result.push(model);
        });

        return result;
    }
};

app.Models.Providers = {
    Facebook: 0,
    Instagram: 1,
    Twitter: 2,
    Flickr: 3
};


/*------------- NON-SERIALIZABLE ------------ */

/* ================ AuthInfo ================ */
app.Models.AuthInfo = (function () {
    function AuthInfo(accessToken) {
        this.accessToken = accessToken;
    }

    return AuthInfo;
})();

/*------------- SERIALIZABLE ------------- */

/* ================ User ================= */
app.Models.User = (function () {
    var type = "User";

    function User(params) {
        this.type = type;
        this.provider = params.provider;
        this.id = params.id;
        this.name = params.name;
        this.thumbnail = params.thumbnail;
    }

    User.prototype.toObject = function () {
        return {
            type: this.type,
            provider: this.provider,
            id: this.id,
            name: this.name,
            thumbnail: this.thumbnail
        };
    };

    User.prototype.toJson = function () {
        return JSON.stringify(toObject());
    };

    return User;
})();


/* ================ Post ================= */
app.Models.Post = (function () {
    var type = "Post";

    function Post(params) {
        this.type = type;
        this.provider = params.provider;
        this.id = params.id;
        this.created = params.created;
        this.message = params.message;
        this.thumbnail = params.thumbnail;
        this.user = !!params.user ? app.Models.getModel(params.user) : null; // app.Models.User

        this.otherInfo = params.otherInfo;
        this.fb_type = params.otherInfo.type;
    }

    Post.prototype.toObject = function () {
        return {
            type: this.type,
            provider: this.provider,
            id: this.id,
            created: this.created,
            message: this.message,
            thumbnail: this.thumbnail,
            user: !!this.user ? this.user.toObject() : null,

            otherInfo: this.otherInfo,
            fb_type: this.fb_type
        };
    };

    Post.prototype.toJson = function () {
        return JSON.stringify(toObject());
    };

    return Post;
})();


/* ================ Photo ================= */
app.Models.Photo = (function () {
    var type = "Photo";

    function Photo(params) {
        this.type = type;
        this.provider = params.provider,
        this.id = params.id;
        this.thumbnail = params.thumbnail;
        this.source = params.source;
        this.width = params.width;
        this.height = params.height;
        this.caption = params.caption;
    }

    Photo.prototype.toObject = function () {
        return {
            type: this.type,
            provider: this.provider,
            id: this.id,
            thumbnail: this.thumbnail,
            source: this.source,
            width: this.width,
            height: this.height,
            caption: this.caption
        };
    };

    Photo.prototype.toJson = function () {
        return JSON.stringify(toObject());
    };

    return Photo;
})();


/* ================ Album ================= */
app.Models.Album = (function () {
    var type = "Album";

    function Album(params) {
        this.type = type;
        this.provider = params.provider;
        this.id = params.id;
        this.name = params.name;
        this.coverPhotoId = params.coverPhotoId;
        this.photos = !!params.photos ? app.Models.getModelArray(params.photos) : []; // List of app.Models.Photo
    }

    Album.prototype.toObject = function () {
        return {
            type: this.type,
            provider: this.provider,
            id: this.id,
            name: this.name,
            coverPhotoId: this.coverPhotoId,
            photos: !!this.photos ? app.Models.getObjectArray(this.photos) : []
        };
    };

    Album.prototype.toJson = function () {
        return JSON.stringify(toObject());
    };

    return Album;
})();