

const modules = process.argv.slice(2);
try {
    for (let module of modules) {
        await import(module);
    }
}
catch(err) {
    console.log(err)
    process.exit(1);
}

// node health_check.mjs $(get_packages "backend_dependencies") && node health_check.mjs $(get_packages "backend_dev_dependencies")

// if [ "$?" != "0" ]; then
//     NEED_INSTALL_MODULES=true
// fi