var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

// NOTE: there is a bug in the Sequelize library where it doesn’t
// support absolute sqlite URIs, which is why it’s stored in the root directory
// @see: https://github.com/sequelize/sequelize/issues/4721
var sequelize = new Sequelize('sqlite:database.sqlite', {
  logging: false,
});

var Flag = sequelize.define('flag', {
  type: { type: Sequelize.STRING, allowNull: false },
  value: { type: Sequelize.STRING, allowNull: false },
});

var Concept = sequelize.define('concept', {
  id: { type: Sequelize.STRING, primaryKey: true },
  type: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  datasets: { type: Sequelize.STRING },
}, {
  setterMethods: {
    datasets: function (value) {
      this.setDataValue('datasets', value.join(','));
    },
  },
  getterMethods: {
    datasets: function () {
      return (this.getDataValue('datasets') || '').split(',');
    },
  },
});

var Origin = Flag.belongsTo(Concept, { as: 'origin' });
var Target = Flag.belongsTo(Concept, { as: 'target' });

sequelize.sync({ force: false }).then(function () {});

app.get('/flags', function (req, res) {
  Flag.findAll({
    include: [Origin, Target],
  }).then(function (rows) {
    res.json(rows);
  });
});

app.get('/flags/relations.ndjson', function (req, res) {
  Flag.findAll({
    include: [Origin, Target],
  }).then(function (rows) {
    res.send(rows.map(function (row) {
      return JSON.stringify({
        from: row.originId,
        type: row.value,
        to: row.targetId,
      });
    }).join('\n'));
  });
});

app.post('/flags', function (req, res) {
  var data = req.body;

  Concept
    .findOrCreate({
      where: { id: data.origin.id },
      defaults: data.origin,
    })
    .then(function () {
      return Concept.findOrCreate({
        where: { id: data.target.id },
        defaults: data.target,
      });
    })
    .then(function () {
      return Flag.create({
        type: data.type,
        value: data.value,
        originId: data.origin.id,
        targetId: data.target.id,
      });
    })
    .then(function (flag) {
      return res.status(201).json(flag);
    });
});

module.exports = app;
