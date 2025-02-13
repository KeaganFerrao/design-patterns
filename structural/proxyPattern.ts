// Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. 
// A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.
// There can be variour types of proxies such as a:-
// 1. Remote proxy - Provides remote access to another object under the hood
// 2. Virtual proxy - Provides a feature to load the heavy resource only when used 
// 3. Protection proxy - Restricts access to properties
// 4. Caching proxy - Caches certian responses
// 5. Logging proxy - Can log requests somewhere before passing it to actual service
// There are many more types of proxies which are not mentioned in the list.

interface ThirdPartyYoutubeLib {
    listVideos(): void;
    getVideoInfo(id: string): void;
    downloadVideo(id: string): void;
}

// This can be your own class or a class provided by any library, so we cannot directly add the caching behavior into the
// library class, it would not be recommended, Keep it loosly coupled
class ThirdPartYoutubeClass implements ThirdPartyYoutubeLib {
    listVideos(): void {
        // Sends API request to youtube
    }

    getVideoInfo(id: string): void {
        // Get meta data about some video
    }

    downloadVideo(id: string): void {
        // Download a video file from YouTube.
    }
}

// Caching proxy which adds caching behavior to the existing class by implementing the same interface and taking the original
// class through the constructor and maintaing a reference to it
// By creating a seperate proxy for you main library class gives you loose coupling, so your not directly coding the caching 
// behavior into you library and let it only focus on youtube specific functionality. Also any changes to the caching policies
// wont need to make changes to the main class, only need to modify the cache proxy
class CachedYoutubeProxy implements ThirdPartyYoutubeLib {
    private service: ThirdPartYoutubeClass;

    // This could be an simple internal cache like a Map or some external cache such as redis, database, etc.
    private videoCache: Map<string, string> = new Map();

    constructor(service: ThirdPartYoutubeClass) {
        this.service = service;
    }

    // Sends API request to youtube or can cache this also if needed
    listVideos(): void {
        return this.service.listVideos();
    }

    // Get meta data about some video or can cache this also if needed
    getVideoInfo(id: string): void {
        return this.service.getVideoInfo(id);
    }

    // Download a video file from YouTube or return from cache if already downloaded
    downloadVideo(id: string): void {
        const cachedVideo = this.videoCache.get(id);
        if (cachedVideo) {
            // If available in cache, return it from there, no need to download it again
        } else {
            this.service.downloadVideo(id);
            this.videoCache.set(id, "Download location or metadata");
        }
    }
}