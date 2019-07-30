# nodedebt v0.03

## List all transactions:
```/?action=check```

 Check the existence of a User:
```/?action=checkuser&person=John```

Lists all Unique users:
```/?action=listusers```

Check all transactions for person:
```/?action=query&person=John```

Check all outgoing/incoming transactions:
```/?action=outgoing&person=John```
```/?action=incoming&person=John```

Make a transaction:
```/?action=transaction&Sentfrom=John&Sentto=Peter&value=3&comment=abcd```

# nodedebt v0.03
Made it more clear which direction the debt is facing through the user query



