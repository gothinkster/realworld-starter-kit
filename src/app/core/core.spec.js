const { preventDefaultOn, changeLocation } = require('./attributes');

describe('Core', () => {
  describe('Attributes', () => {
    describe('Prevent Default On', () => {
      it('Should prevent default in the event', () => {
        let flag = false;
        let flag2 = false;
        const event = {
          preventDefault() {
            flag = true;
          },
        };
        preventDefaultOn(() => {})(null, event);

        expect(flag).toBe(true);
      });

      it('Should execute the provided action', () => {
        let flag = false;
        const event = {
          preventDefault() {},
        };
        preventDefaultOn(() => (flag = true))(null, event);

        expect(flag).toBe(true);
      });
    });

    describe('Change Location', () => {
      it('Should change location', () => {
        location.href = '#something';
        changeLocation('#anotherThing');

        expect(location.hash).toBe('#anotherThing');
      });
    });
  });
});
