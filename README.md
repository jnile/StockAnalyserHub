# Stock Analyser

This is a side project to analyse stock data. **This is not a tool to tell you when and how to trade.**
Using common candlestick patterns, it displays:
- Which pattern pattern the data matches
- Which direction the pattern expects the market to go
- If this is a good scenario to buy or sell, using the extremely limited data.

## DotEnv File
There is a limit of 25 api calls per day for the free version of alpha venture.

DEV_MODE will use a stored dataset for api calls, ensuring the limit is not reached.

Example .env file:

ALPHAVENTURE_API_KEY = key
DEV_MODE = true