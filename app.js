

var http = require('http');
var url = require("url");
var querystring = require('querystring');
var fs = require('fs');

var Datastore = require('nedb')
var transactiondb = new Datastore({ filename: './transactions.db', autoload: true });

function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

// Code exactly the same as the previous one

//?action=check
//ID,From,To,Value,Date,Comment


var instructionsNewVisitor = function(req, res) {
  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query); //parses params
  console.log(params);
  res.writeHead(200, {"Content-Type": "text/plain"});
  if ('action' in params)
  {

    if (params['action'] == "check")
    {
      towrite = '';
      transactiondb.find({}, function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
          towrite += ('{_id: ' + docs[i]._id + ', from: ' + docs[i].Sentfrom + ', to: ' + docs[i].Sentto + ', value: ' +  docs[i].value +', date: ' + docs[i].date + ', comment: ' + docs[i].comment + '}');
          towrite += '\n'
        }
        res.write(towrite);
        res.end();
      });
      console.log(towrite);

    }
      //?action=query&person=John
    else if (params['action'] == "query") {
      var person = params['person'];
      var totalsum = 0;
      var towrite = '';
      transactiondb.find( {$or:[{Sentfrom: person},{Sentto: person}]}, function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
          towrite += ('{ From: ')
          towrite+= (docs[i].Sentfrom);
          towrite += (', To: ')
          towrite+= (docs[i].Sentto);
          towrite += (', value: ')
          towrite+= (docs[i].value);
          towrite += ', comment: '
          towrite+=(docs[i].comment);
          towrite += ', date: '
          towrite+=(docs[i].date);
          towrite += '}\n'
          totalsum += docs[i].value;
        }
        towrite+=("{Total: " + totalsum.toFixed(2) + '}');
        console.log("Total: " + totalsum.toFixed(2));
        res.write(towrite);
        res.end();
      });

    }

    //?action=incoming&person=John
        else if (params['action'] == "incoming") {
      var person = params['person'];
      var totalsum = 0;
      var towrite = '';
      transactiondb.find( {Sentto: person}, function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
          towrite += ('{ From: ')
          towrite+= (docs[i].Sentfrom);
          towrite += (', To: ')
          towrite+= (docs[i].Sentto);
          towrite += (', value: ')
          towrite+= (docs[i].value);
          towrite += ', comment: '
          towrite+=(docs[i].comment);
          towrite += ', date: '
          towrite+=(docs[i].date);
          towrite += '}\n'
          totalsum += docs[i].value;
        }
        towrite+=("{Total: " + totalsum.toFixed(2) + '}');
        console.log("Total: " + totalsum.toFixed(2));
        res.write(towrite);
        res.end();
      });

    }

    //?action=incoming&person=John
        else if (params['action'] == "outgoing") {
      var person = params['person'];
      var totalsum = 0;
      var towrite = '';
      transactiondb.find( {Sentfrom: person}, function (err, docs) {
        for (var i = 0; i < docs.length; i++) {
          towrite += ('{ From: ')
          towrite+= (docs[i].Sentfrom);
          towrite += (', To: ')
          towrite+= (docs[i].Sentto);
          towrite += (', value: ')
          towrite+= (docs[i].value);
          towrite += ', comment: '
          towrite+=(docs[i].comment);
          towrite += ', date: '
          towrite+=(docs[i].date);
          towrite += '}\n'
          totalsum += docs[i].value;
        }
        towrite+=("{Total: " + totalsum.toFixed(2) + '}');
        console.log("Total: " + totalsum.toFixed(2));
        res.write(towrite);
        res.end();
      });

    }

    //?action=transaction&Sentfrom=John&Sentto=Peter&value=3&comment=abcd
    else if (params['action'] == "transaction") {
      var Sentfrom = params['Sentfrom'];
      var Sentto = params['Sentto'];
      var trademoney = parseFloat(params['value']);
      var lastID;
      var comment = params['comment'];
      var today = new Date;
      today = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
      transactiondb.find({}, function (err, docs) {
        if (docs.length > 0){
          console.log(docs.length);

          lastID = docs[docs.length-1]._id;
        }
        else {
          lastID = 0;
        }
        var payload= { _id: lastID+1, Sentfrom: Sentfrom, Sentto: Sentto, value: trademoney, date: today, comment: comment };
        transactiondb.insert(payload, function (err, newDoc) {});
        res.end("lent");
      });

    }
    //?action=checkuser&person=John
    else if (params['action'] == "checkuser") {
      var recipient = params['person'];
      var result;
      transactiondb.find({$or:[{Sentfrom: person},{Sentto: person}]}, function (err, docs) {
        if (docs.length>0)
        {
          result = '1';
        }
        else {
          result='0';
        }
        res.write(result);
        res.end();
      });
    }
    //?action=listusers
    else if (params['action'] == "listusers") {
      var result = '';
      var names = [];

      transactiondb.find({}, function (err, docs) {
        if (docs.length>0)
        {
          for (var i = 0; i < docs.length; i++) {
            names.push(docs[i].Sentfrom);
            names.push(docs[i].Sentto);
          }
          unique = removeDups(names);
          for (var i = 0; i < unique.length; i++) {
            result += '{name: ';
            result += unique[i];
            result += '} \n';
          }
        }
        else {
          result='0';
        }
        res.write(result);
        res.end();
      });
    }


  }
  else {
    res.write("no action");
    res.end();//close and send
  }



}

var server = http.createServer(instructionsNewVisitor);
server.listen(8081);
console.log("Listening")
