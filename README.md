# nodedebt
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

