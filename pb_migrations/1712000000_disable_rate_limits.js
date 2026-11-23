/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const settings = $app.settings()
    
    // Force disable rate limits globally
    settings.rateLimits.enabled = false
    settings.rateLimits.rules = []
    
    // Save the settings back to the database
    $app.dao().saveSettings(settings)
}, (db) => {
    // Rollback: re-enable rate limits
    const settings = $app.settings()
    settings.rateLimits.enabled = true
    $app.dao().saveSettings(settings)
})
