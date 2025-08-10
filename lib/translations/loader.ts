/**
 * Translation Loader System with Namespace Support
 * Handles dynamic loading and caching of translation namespaces
 */

interface TranslationCache {
  [locale: string]: {
    [namespace: string]: Record<string, string>
  }
}

interface NamespaceConfig {
  core: string[]
  projects: string[]
  components: string[]
}

class TranslationLoader {
  private cache: TranslationCache = {}
  private loadingPromises: Map<string, Promise<Record<string, string>>> = new Map()
  
  // Define which namespaces contain which types of content
  private namespaceConfig: NamespaceConfig = {
    core: ['navbar', 'hero', 'about', 'history', 'contact', 'timeline'],
    projects: ['shopup', 'barberia', 'isidoro', 'security', 'logistics', 'shared'],
    components: ['terminal', 'ui', 'card']
  }

  /**
   * Load a specific namespace for a locale
   */
  async loadNamespace(locale: string, namespace: string): Promise<Record<string, string>> {
    const cacheKey = `${locale}:${namespace}`
    
    // Return from cache if available
    if (this.cache[locale]?.[namespace]) {
      return this.cache[locale][namespace]
    }

    // Return existing promise if currently loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!
    }

    // Create loading promise
    const loadingPromise = this.loadNamespaceData(locale, namespace)
    this.loadingPromises.set(cacheKey, loadingPromise)

    try {
      const data = await loadingPromise
      
      // Cache the result
      if (!this.cache[locale]) {
        this.cache[locale] = {}
      }
      this.cache[locale][namespace] = data
      
      return data
    } finally {
      // Clean up loading promise
      this.loadingPromises.delete(cacheKey)
    }
  }

  /**
   * Load namespace data from appropriate file
   */
  private async loadNamespaceData(locale: string, namespace: string): Promise<Record<string, string>> {
    try {
      let data: Record<string, string> = {}

      if (this.namespaceConfig.core.includes(namespace)) {
        // Load from core
        const moduleData = await import(`@/locales/core/${locale}.json`)
        data = this.extractNamespaceData(moduleData.default, namespace)
      } else if (this.namespaceConfig.projects.includes(namespace)) {
        // Load from projects
        if (namespace === 'shared') {
          const moduleData = await import(`@/locales/projects/shared/${locale}.json`)
          data = moduleData.default
        } else {
          const moduleData = await import(`@/locales/projects/${namespace}/${locale}.json`)
          data = moduleData.default
        }
      } else if (this.namespaceConfig.components.includes(namespace)) {
        // Load from components
        const moduleData = await import(`@/locales/components/${namespace}/${locale}.json`)
        data = moduleData.default
      } else {
        // Fallback to legacy system for unknown namespaces
        const legacyModuleData = await import(`@/locales/${locale}.json`)
        data = this.extractNamespaceData(legacyModuleData.default, namespace)
      }

      return data
    } catch (error) {
      // Failed to load namespace - silent in production
      return {}
    }
  }

  /**
   * Extract namespace data from legacy flat structure
   */
  private extractNamespaceData(data: Record<string, string>, namespace: string): Record<string, string> {
    const result: Record<string, string> = {}
    const prefix = `${namespace}.`
    
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith(prefix)) {
        result[key] = value
      }
    }
    
    return result
  }

  /**
   * Load multiple namespaces at once
   */
  async loadNamespaces(locale: string, namespaces: string[]): Promise<Record<string, Record<string, string>>> {
    const promises = namespaces.map(async (namespace) => ({
      namespace,
      data: await this.loadNamespace(locale, namespace)
    }))

    const results = await Promise.all(promises)
    
    return results.reduce((acc, { namespace, data }) => {
      acc[namespace] = data
      return acc
    }, {} as Record<string, Record<string, string>>)
  }

  /**
   * Get cached namespaces for a locale
   */
  getCachedNamespaces(locale: string): string[] {
    return Object.keys(this.cache[locale] || {})
  }

  /**
   * Clear cache for specific locale or all
   */
  clearCache(locale?: string): void {
    if (locale) {
      delete this.cache[locale]
    } else {
      this.cache = {}
    }
  }

  /**
   * Preload critical namespaces
   */
  async preloadCritical(locale: string): Promise<void> {
    const criticalNamespaces = ['navbar', 'hero', 'about']
    await this.loadNamespaces(locale, criticalNamespaces)
  }

  /**
   * Get translation with namespace support
   * Supports both legacy keys and namespaced keys
   */
  async getTranslation(locale: string, key: string): Promise<string> {
    // Check if key contains namespace separator
    if (key.includes(':')) {
      const [namespace, translationKey] = key.split(':', 2)
      const namespaceData = await this.loadNamespace(locale, namespace)
      return namespaceData[translationKey] || key
    }

    // Legacy key format - determine namespace from key prefix
    const keyParts = key.split('.')
    if (keyParts.length > 1) {
      const potentialNamespace = keyParts[0]
      const namespaceData = await this.loadNamespace(locale, potentialNamespace)
      return namespaceData[key] || key
    }

    return key
  }
}

// Create singleton instance
export const translationLoader = new TranslationLoader()

// Export types
export type { TranslationCache, NamespaceConfig }