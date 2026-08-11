import { AppShell } from "@/components/app-shell";
import { StrategyBuilderForm } from "./StrategyBuilderForm";

export default function StrategyBuilderPage() {
  return (
    <AppShell title="Strategy Builder" subtitle="No-code builder">
      <StrategyBuilderForm />
    </AppShell>
  );
}
