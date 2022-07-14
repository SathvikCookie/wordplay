import { ExpectedSelectName, NonBooleanQuery, NotATable, testConflict, UnknownColumn } from "../parser/Conflict";
import Select from "./Select";

test("Test select conflicts", () => {

    testConflict('table: |one•#\ntable|?|one', 'table: 1\ntable|?|one', Select, NotATable);
    testConflict('table: |one•#\ntable|? 1 < 2', 'table: 1\ntable|? 1 + 2', Select, NonBooleanQuery);
    testConflict('table: |one•#\ntable|?|one', 'table: |one•#\ntable|?|two', Select, UnknownColumn);
    testConflict('table: |one•#\ntable|?|one one<1', 'table: |one•#\ntable|?|1 one<1', Select, ExpectedSelectName);
    
});