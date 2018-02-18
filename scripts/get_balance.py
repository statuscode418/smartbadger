import argparse

import web3


def main(account, provider_uri=None):
    provider = web3.Web3(web3.HTTPProvider(provider_uri))
    balance = web3.Web3.fromWei(provider.eth.getBalance(account), 'ether')
    print(balance, "Ether")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('account', help='Account address')
    parser.add_argument('--provider', required=True, help='Provider address')
    args = parser.parse_args()
    main(args.account, provider_uri=args.provider)
