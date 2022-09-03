const buildTransaction = ({ actor, action, data, contract }) => {
  return {
    actions: [
      {
        authorization: [
          {
            actor,
            permission: 'active'
          }
        ],
        account: contract,
        name: action,
        data
      }
    ]
  }
}

const vote = ({ actor, election }) => {
  const data = { voter: actor, course: election }

  return buildTransaction({
    data,
    actor,
    action: 'vote',
    contract: 'tecworkshop1'
  })
}

const pay = actor => {
  const data = {
    from: actor,
    to: 'eosio.token',
    memo: 'pay course',
    quantity: '3.0000 EOS'
  }

  return buildTransaction({
    data,
    actor,
    action: 'transfer',
    contract: 'eosio.token'
  })
}

export { vote, pay }
