#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>

using namespace eosio;

CONTRACT voting : public contract
{
public:
   using contract::contract;

   ACTION vote(name voter, bool agree);

   [[eosio::on_notify("eosio.token::transfer")]] void onpay(name from, name to, asset quantity, std::string memo);

private:
   const int64_t REGISTRATION_COST = 3;

   TABLE enroll
   {
      name student;

      auto primary_key() const
      {
         return student.value;
      }
   };
   typedef multi_index<name("enroll"), enroll> enroll_table;

   TABLE votes
   {
      name voter;

      auto primary_key() const
      {
         return voter.value;
      }
   };
   typedef multi_index<name("votes"), votes> votes_table;
};