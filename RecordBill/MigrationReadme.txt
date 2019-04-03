/*添加迁移*/
Add-migration -context LogDbContext xxxxxxxxxx
Add-migration -context UserDbContext xxxxxxxxxx
Add-migration -context RecordBillDbContext xxxxxxxxxx

/*更新迁移*/
update-database -context LogDbContext
update-database -context UserDbContext
update-database -context RecordBillDbContext


/*移除迁移*/
remove-migration -context LogDbContext
remove-migration -context UserDbContext
remove-migration -context RecordBillDbContext