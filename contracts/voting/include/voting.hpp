#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>

using namespace eosio;

CONTRACT voting : public contract
{
public:
   using contract::contract;

   ACTION vote(name voter, std::string course);

   ACTION clearvotes();

   ACTION clearall();

   [[eosio::on_notify("eosio.token::transfer")]] void onpay(name from, name to, asset quantity, std::string memo);

private:
   const int64_t REGISTRATION_COST = 30000;

   TABLE students
   {
      name student;

      auto primary_key() const
      {
         return student.value;
      }
   };
   typedef multi_index<name("students"), students> students_table;

   TABLE votes
   {
      name voter;
      std::string course;

      auto primary_key() const
      {
         return voter.value;
      }
   };
   typedef multi_index<name("votes"), votes> votes_table;
};