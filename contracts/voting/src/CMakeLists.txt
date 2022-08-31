project(voting)

set(EOSIO_WASM_OLD_BEHAVIOR "Off")
find_package(eosio.cdt)

add_contract( voting voting voting.cpp )
target_include_directories( voting PUBLIC ${CMAKE_SOURCE_DIR}/../include )
target_ricardian_directory( voting ${CMAKE_SOURCE_DIR}/../ricardian )