@echo off
for /r . %%g in (*.txt) do start cmd /k python app.py "%%g"