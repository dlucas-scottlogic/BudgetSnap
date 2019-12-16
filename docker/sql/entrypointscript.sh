#!/bin/bash

echo "Starting db"
echo "Collation needs to be ${MSSQL_COLLATION}"
$(/opt/mssql/bin/sqlservr > tempLog) &


until grep -q "Server process ID is " tempLog; do sleep 1; echo "Waiting for Sql"; done

grep -q "Did not find an existing master data file" tempLog
if [ $? -eq 0 ]
then
    until grep -q "The default collation was successfully changed." tempLog; do sleep 1; echo "Waiting for SQL collation"; done
    
    echo "Creating Database"
    /opt/mssql-tools/bin/sqlcmd -S localhost -U ${MSSQL_SA_USER} -P ${MSSQL_SA_PASSWORD} -Q "CREATE DATABASE BudgetSnap COLLATE Latin1_General_CI_AS;"
    echo "Database Created"

    echo "Running setup script"
    /opt/mssql-tools/bin/sqlcmd -S localhost -U ${MSSQL_SA_USER} -P ${MSSQL_SA_PASSWORD} -d BudgetSnap -i /scripts/setup.sql
	echo "setup script complete"
   
else
    until grep -q "SQL Server is now ready for client connections." tempLog; do sleep 1; echo "Waiting for SQL to be ready"; done
fi

echo "Database Ready"
tail -f /var/opt/mssql/log/errorlog
