# URL Shortener Microservice

This is the result to complete the URL Shortener Microservice project at freecodecamp.
Instructions for building this project can be found at
https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice

### Tests

- You should provide your own project, not the example URL.
- You can POST a URL to `/api/shorturl` and get a JSON response with `original_url` and short_url properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1}`
- When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.
- If you pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain `{ error: 'invalid url' }`

### Test Result

<img src="submit.PNG">
