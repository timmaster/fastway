/* Requires:
    app.Models
    app.FacebookMapper
    FB
*/

app.Repository = (function () {
    var _p = {
        authInfo: {
            //app.Models.Providers.Facebook: app.Models.AuthInfo
        },
        mappers: {
            //app.Models.Providers.Facebook: app.FacebookMapper
        },
        cache: {
            posts: {}
        }
    };

    var init = function () {
        _p.mappers[app.Models.Providers.Facebook] = app.FacebookMapper;
    };

    var setAuthInfo = function (provider, providerAuthData) {
        _p.authInfo[provider] = _p.mappers[provider].getAuthInfo(providerAuthData);
    };

    var login = function (provider, completeCallback, cancelledCallback) {
        if (provider == app.Models.Providers.Facebook) {
            loginFacebook(completeCallback, cancelledCallback);
        }
    };

    var loginFacebook = function (completeCallback, cancelledCallback) {
        completeCallback = completeCallback || function (response, provider) { };
        cancelledCallback = cancelledCallback || function (provider) { };
        var provider = app.Models.Providers.Facebook;

        FB.login(function (response) {
            if (response.authResponse) {
                // connected
                setAuthInfo(response.authResponse);
                completeCallback(response.authResponse, app.Models.Providers.Facebook);
                app.debug("loginConnectedResponse", response);
            } else {
                // cancelled
                cancelledCallback(app.Models.Providers.Facebook);
                app.log("Facebook login cancelled.");
                app.debug("loginCancelledResponse", response);
            }
        }, {
            scope: "user_about_me,user_activities,user_interests,user_photos,user_status,read_stream"
        });
    }

    var getUser = function (id, provider, callback) {

    };

    var getFeed = function (provider, callback, paging, forceGet) {
        // TODO: Paging
        // TODO: Cache?

        var handleResponse = function (list) {
            var result = [];

            _.each(list, function (o) {
                var item = _p.mappers[provider].getPost(o);
                result.push(item);
            });

            callback(result);
        };

        if (provider == app.Models.Providers.Facebook) {
            FB.api("/me/home/?access_token=" + _p.authInfo[provider].accessToken + "&limit=50", function (response) {
                app.debug("home", response);
                handleResponse(response.data);
            });
        }
    };

    init(); // TODO: Don't self init if need to pass data.

    return {
        init: init,
        login: login,
        setAuthInfo: setAuthInfo,
        getFeed: getFeed
    };
})();