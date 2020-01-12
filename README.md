# lunrjs-poc

```
# create json files
$ ./scripts/mp32json.bash /path/to/mp3

# indexing
$ npm run lunr:index

# searching
$ npm run lunr:search --silent "細野晴臣 はらいそ" | jq
[
  {
    "ref": "/xxx/music/japanese/細野晴臣/1978 - はらいそ/09 はらいそ.mp3",
    "score": 12.862979456564485,
    "matchData": {
      "metadata": {
        "細野晴臣": {
          "artist": {},
          "albumArtist": {}
        },
        "はらいそ": {
          "title": {}
        }
      }
    }
  },
  {
    "ref": "/xxx/music/japanese/細野晴臣/2008 - 細野晴臣 STRANGE SONG BOOK -Tribute To Haruomi Hosono/2-10 はらいそ.mp3",
    "score": 10.038087865724227,
    "matchData": {
      "metadata": {
        "細野晴臣": {
          "albumArtist": {}
        },
        "はらいそ": {
          "title": {}
        }
      }
    }
  },
  {
    "ref": "/xxx/music/japanese/細野晴臣/1973 - Hosono House/01 ろっか・ばい・まい・べいびい.mp3",
    "score": 5.593921745966777,
    "matchData": {
      "metadata": {
        "細野晴臣": {
          "artist": {},
          "albumArtist": {}
        }
      }
    }
  }
]
```