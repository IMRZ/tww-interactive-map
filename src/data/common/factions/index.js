import vanilla from './vanilla.json';
import ovn from './ovn.json';

export const groups = {
  'OvN Lost Factions': Object.values(ovn).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
  'Vanilla': Object.values( // TODO: lol wtf cleanup please
    Object.values(vanilla)
      .reduce((accumulator, faction) => {
        if (accumulator[faction.name] === undefined) {
          accumulator[faction.name] = faction;
        }
        return accumulator;
      }, {})
  ).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

};

const allFactions = {
  ...vanilla,
  ...ovn
};

export default allFactions;
