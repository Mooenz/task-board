type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return <main className="flex justify-center items-center min-h-dvh p-2 py-6 lg:py-10">{children}</main>
}
