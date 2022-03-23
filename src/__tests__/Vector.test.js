import Vector from '../Vector';

test("vector norm", () => {
    const v = new Vector({x:0.3642229242809535, y:0.21591807938561325, z:0.5819032448659286})
    expect(v.norm()).toEqual(0.7196459837745487)
});
  
test("vector normalize", () => {
  const v = new Vector({x:0.3642229242809535, y:0.21591807938561325, z:0.5819032448659286})
  v.normalize()

  expect(v.norm()).toBeCloseTo(1)

  expect(v.x).toBeCloseTo(0.5061140234127361)
  expect(v.y).toBeCloseTo(0.30003374472142713)
  expect(v.z).toBeCloseTo(0.8085965293849645)
});

test("vector cross product", () => {

  const v1 = new Vector({x:0.3642229242809535, y:0.21591807938561325, z:0.5819032448659286})
  const v2 = new Vector({x:0.8790460593860366, y:0.05947685187926244, z:0.165321781515252})
  const cross = v1.cross(v2)

  expect(cross.x).toBeCloseTo(0.0010861884424281723)
  expect(cross.y).toBeCloseTo(0.45130577163252056)
  expect(cross.z).toBeCloseTo(-0.16813910391563466)
});
