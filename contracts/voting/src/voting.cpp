#include <voting.hpp>

ACTION voting::vote(name voter, bool agree)
{
   enroll_table _enroll{get_self(), get_self().value};
   auto enroll_itr = _enroll.find(voter.value);

   check(enroll_itr != _enroll.end(), "Student is not enrolled");

   votes_table _votes{get_self(), get_self().value};
   auto votes_itr = _votes.find(voter.value);

   check(votes_itr != _votes.end(), "Student already voted");

   _votes.emplace(get_self(), [&](auto &row)
                  { row.voter = voter; });
}

ACTION voting::onpay(name from, name to, asset quantity, std::string memo)
{
   check(quantity.amount == REGISTRATION_COST, "The cost to enroll is incorrect, please pay " + std::to_string(REGISTRATION_COST) + " EOS only.");

   enroll_table _enroll{get_self(), get_self().value};
   auto enroll_itr = _enroll.find(from.value);

   check(enroll_itr == _enroll.end(), "Student is already enrolled");

   _enroll.emplace(get_self(), [&](auto &row)
                   { row.student = from; });
}