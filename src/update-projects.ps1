# Update project files to use correct paths
Get-ChildItem -Path "src" -Recurse -Filter "*.csproj" | ForEach-Object {
     = Get-Content .FullName
    # No changes needed usually, but we can clean up if needed
     | Set-Content .FullName
}
