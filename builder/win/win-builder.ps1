$script_path = $MyInvocation.MyCommand.Path
# the root dir for utility is two levels above
$utility_dir = Split-Path -Path $script_path -Parent | Split-Path | Split-Path
$dist_path = "$utility_dir\dist"

$default_name = "DiscoveryUtility 1.0.0.exe"

# install the dependencies from package.json 
npm install --no-save

# build the bundle to apply the changes 
npm run dev

# build binary. It will be placed under $dist_path
npm run build:win64

# rename
if ($args[0]) {
    Rename-Item -Path "$dist_path\$default_name" -NewName $args[0]
}
