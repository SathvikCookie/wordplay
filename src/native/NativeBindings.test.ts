import Evaluator from "../runtime/Evaluator";

test("Test list functions", () => {

    expect(Evaluator.evaluateCode("[1 2 3].first()")?.toString()).toBe('1');
    expect(Evaluator.evaluateCode("[1 2 3].last()")?.toString()).toBe('3');
    expect(Evaluator.evaluateCode("[1 2 3].reverse()")?.toString()).toBe('[3 2 1]');
    expect(Evaluator.evaluateCode("[1 2 3].sansFirst()")?.toString()).toBe('[2 3]');
    expect(Evaluator.evaluateCode("[1 2 3].sansLast()")?.toString()).toBe('[1 2]');
    expect(Evaluator.evaluateCode("[1 2 3].sans(2)")?.toString()).toBe('[1 3]');
    expect(Evaluator.evaluateCode("[1 2 3 1 2 3].sansAll(1)")?.toString()).toBe('[2 3 2 3]');

});

test("Test set functions", () => {

    expect(Evaluator.evaluateCode("{1 2 3}.add(1)")?.toString()).toBe('{1 2 3}');
    expect(Evaluator.evaluateCode("{1 2 3}.add(4)")?.toString()).toBe('{1 2 3 4}');
    expect(Evaluator.evaluateCode("{1 2 3}.remove(1)")?.toString()).toBe('{2 3}');
    expect(Evaluator.evaluateCode("{1 2 3}.union({3 4})")?.toString()).toBe('{1 2 3 4}');
    expect(Evaluator.evaluateCode("{1 2 3}.intersection({2 3 4})")?.toString()).toBe('{2 3}');
    expect(Evaluator.evaluateCode("{1 2 3}.difference({3 4 5})")?.toString()).toBe('{1 2}');

});

test("Test map functions", () => {

    expect(Evaluator.evaluateCode('{1:"hi" 2:"bye"}.set(3 "hello")')?.toString()).toBe('{1:"hi" 2:"bye" 3:"hello"}');
    expect(Evaluator.evaluateCode('{1:"hi" 2:"bye"}.set(1 "hello")')?.toString()).toBe('{1:"hello" 2:"bye"}');
    expect(Evaluator.evaluateCode('{1:"hi" 2:"bye"}.unset(1)')?.toString()).toBe('{2:"bye"}');    
    expect(Evaluator.evaluateCode('{1:"hi" 2:"bye"}.remove("bye")')?.toString()).toBe('{1:"hi"}');

});