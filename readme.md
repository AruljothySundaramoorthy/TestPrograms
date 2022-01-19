# TstGround

## Cluster concurrentcy test
   run node cluter.js
loadtest http://localhost:3000/ -n 1000 -c 100

## example
   C:\Users\arulj\Documents\GitHub\exercices>loadtest http://localhost:3000/ -n 10000 -c 100
[Mon Jul 26 2021 10:16:46 GMT+0530 (India Standard Time)] INFO Requests: 0 (0%), requests per second: 0, mean latency: 0 ms
[Mon Jul 26 2021 10:16:52 GMT+0530 (India Standard Time)] INFO Requests: 1433 (14%), requests per second: 283, mean latency: 342.1 ms
[Mon Jul 26 2021 10:16:57 GMT+0530 (India Standard Time)] INFO Requests: 3104 (31%), requests per second: 335, mean latency: 298.1 ms
[Mon Jul 26 2021 10:17:01 GMT+0530 (India Standard Time)] INFO Requests: 4633 (46%), requests per second: 309, mean latency: 324.3 ms
[Mon Jul 26 2021 10:17:01 GMT+0530 (India Standard Time)] INFO Errors: 1, accumulated errors: 1, 0% of total requests
[Mon Jul 26 2021 10:17:06 GMT+0530 (India Standard Time)] INFO Requests: 6445 (64%), requests per second: 361, mean latency: 277.5 ms
[Mon Jul 26 2021 10:17:06 GMT+0530 (India Standard Time)] INFO Errors: 0, accumulated errors: 1, 0% of total requests
[Mon Jul 26 2021 10:17:12 GMT+0530 (India Standard Time)] INFO Requests: 7961 (80%), requests per second: 298, mean latency: 319.6 ms
[Mon Jul 26 2021 10:17:12 GMT+0530 (India Standard Time)] INFO Errors: 0, accumulated errors: 1, 0% of total requests
[Mon Jul 26 2021 10:17:17 GMT+0530 (India Standard Time)] INFO Requests: 9222 (92%), requests per second: 254, mean latency: 401.5 ms
[Mon Jul 26 2021 10:17:17 GMT+0530 (India Standard Time)] INFO Errors: 0, accumulated errors: 1, 0% of total requests
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO 
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Target URL:          http://localhost:3000/
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Max requests:        10000
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Concurrency level:   100
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Agent:               none
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Completed requests:  10000
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Total errors:        1
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Total time:          32.7324572 s
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Requests per second: 306
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Mean latency:        325.9 ms
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO Percentage of the requests served within a certain time
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO   50%      301 ms
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO   90%      458 ms
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO   95%      545 ms
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO   99%      619 ms
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO  100%      679 ms (longest request)
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO  100%      679 ms (longest request)
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO
[Mon Jul 26 2021 10:17:19 GMT+0530 (India Standard Time)] INFO    -1:   1 errors




## Promise map (Use async await inside map,forloops)
https://dev.to/nyagarcia/array-map-async-await-2cif