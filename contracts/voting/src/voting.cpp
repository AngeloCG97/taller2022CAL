#include <voting.hpp>

ACTION voting::vote(name voter, std::string course)
{
   students_table _students{get_self(), get_self().value};
   auto student_itr = _students.find(voter.value);

   check(student_itr != _students.end(), "Student is not enrolled");

   votes_table _votes{get_self(), get_self().value};
   auto votes_itr = _votes.find(voter.value);

   check(votes_itr == _votes.end(), "Student already voted");

   _votes.emplace(get_self(), [&](auto &row)
                  {
                     row.voter = voter;
                     row.course = course; });
}

void voting::onpay(name from, name to, asset quantity, std::string memo)
{
   check(quantity.amount == REGISTRATION_COST, "The cost to enroll is incorrect, please pay " + std::to_string(REGISTRATION_COST) + " EOS only.");

   students_table _students{get_self(), get_self().value};
   auto student_itr = _students.find(from.value);

   check(student_itr == _students.end(), "Student is already enrolled");

   _students.emplace(get_self(), [&](auto &row)
                     { row.student = from; });
}

ACTION voting::clearvotes()
{
   votes_table _votes(get_self(), get_self().value);
   for (auto itr = _votes.begin(); itr != _votes.end();)
   {
      itr = _votes.erase(itr);
   }
}

ACTION voting::clearall()
{
   votes_table _votes(get_self(), get_self().value);
   for (auto itr = _votes.begin(); itr != _votes.end();)
   {
      itr = _votes.erase(itr);
   }

   students_table _students(get_self(), get_self().value);
   for (auto itr = _students.begin(); itr != _students.end();)
   {
      itr = _students.erase(itr);
   }
}
