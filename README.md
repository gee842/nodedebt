# nodedebt v0.01
simple node api for person debt management

List all transactions:
//?action=check

Pay Person:
//?action=pay&person=John&value=3.33&comment=abcd

Lend to Person:
//?action=lend&person=John&value=3&comment=abcd

Check all Transactions with a user:
//?action=query&person=John
 
 Check the existence of a User:
//?action=checkuser&person=John

Lists all Unique users:
//?action=listusers

# nodedebt v0.02

List all transactions:
//?action=check

 Check the existence of a User:
//?action=checkuser&person=John

Lists all Unique users:
//?action=listusers

Check all transactions for person:
//?action=query&person=John


Check all outgoing/incoming transactions:
//?action=outgoing&person=John
//?action=incoming&person=John

Make a transaction:
//?action=transaction&Sentfrom=John&Sentto=Peter&value=3&comment=abcd

# nodedebt v0.03
Made it more clear which direction the debt is facing through the user query



