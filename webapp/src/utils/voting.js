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

// push action eosio.token transfer
// '{"from": "sometestacco", "to": "tecworkshop1", "quantity": "3.0000 EOS", "memo": "pay course"}'
// -p sometestacco@active

const voting = ({ actor, election }) => {
  const data = { voter: actor, agree: election }

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

export { voting, pay }
