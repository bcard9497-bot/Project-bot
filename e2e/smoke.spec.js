import { test, expect } from '@playwright/test'

test('landing page loads with hero', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sahabat AI')
})

test('can open chat and send a mock message', async ({ page }) => {
  await page.goto('/chat')
  const input = page.getByPlaceholder(/type your message|ketik pesan/i)
  await input.fill('Halo')
  await input.press('Enter')
  // user message shows
  await expect(page.getByText('Halo')).toBeVisible()
  // assistant eventually streams something
  await expect(page.locator('.msg-content').last()).not.toBeEmpty({ timeout: 10000 })
})

test('signup flow stores user and shows dashboard link', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /get started|mulai gratis/i }).first().click()
  await page.getByPlaceholder('you@email.com').fill('test@example.com')
  await page.getByRole('button', { name: /sign up|daftar/i }).click()
  await expect(page).toHaveURL(/chat/)
})
