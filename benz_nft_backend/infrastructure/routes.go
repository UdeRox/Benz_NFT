package infrastructure

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// GinRouter -> Gin Router
type GinRouter struct {
	Gin *gin.Engine
}

// NewGinRouter all the routes are defined here
func NewGinRouter() GinRouter {
	httpRouter := gin.Default()

	// Add CORS middleware
	httpRouter.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, Token")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	httpRouter.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Backend api available.."})
	})

	return GinRouter{
		Gin: httpRouter,
	}
}
