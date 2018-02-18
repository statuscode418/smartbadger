[![SMART BADGER](https://img.shields.io/badge/smart_badger-contract_verified-brightgreen.svg?colorA=172ECF&colorB=2599FF&style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BPHBhdGggZD0iTTUuNjI2IDEuMzUybDIuNS0uMjYzLS44MDcgNS4xOSAyLjE4NC0uMjMtMi42MjIgNy4yMzcuMDY5LTUuNDc0LTIuMjY0LjIzOHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg%3D%3D)](https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d)

# SmartBadger Contract Explorer

This application provides a unique and insightful approach to help understand metrics for a smart contract's activity. We condense certain data points into GitHub badges which are shown below.

Ultimately, this app will serve as a source of contract verification, a visualization of smart contract behavior over time, and a resource of contract utility. 

## Installation Client

1. Navigate into `/client`
1. Install dependencies with `yarn install` || `npm install`
1. Copy over any configuration from config-sample.json into a new config.json file within `/config`. If you're not running a server on localhost:3000, make sure you point it to the correct api url.
1. Start webpack with `yarn dev` || `npm run dev`. By default, it's served on port 8080.


## Installation Server

Install python 3.5 or greater and virtualenv

```sh
virtualenv -p python3 .env
source .env/bin/activate
pip install -r requirements.txt
```

Add a `local_settings.py` file in the `/server/server` directory, alongside the existing `settings.py` file:

```py
PROVIDER_URL = '<http_provider_url>'
```

Install memcached and run:

```sh
brew install memcached
memcached -p 11211
```


## Testing

In the `/server` directory with `manage.py`:

```py
python manage.py test
```


## Sample Badges
[![SMART BADGER](http://ethbadger.com/sample.svg)](https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d)

[![SMART BADGER](http://ethbadger.com/0x06012c8cf97bead5deae237070f9587f8e7a266d/activity.svg)](https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d)

[![SMART BADGER](http://ethbadger.com/0x06012c8cf97bead5deae237070f9587f8e7a266d/balance.svg)](https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d)